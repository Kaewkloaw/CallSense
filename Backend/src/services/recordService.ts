import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export interface PredictionRecord {
  timestamp: string
  filename: string
  human_score: number
  nonhuman_score: number
  risk_level: string
  actual_label?: string // To be filled in manually later
}

const RECORDS_DIR = 'records'
const CSV_FILE = join(RECORDS_DIR, 'predictions.csv')

/**
 * Initialize records directory
 */
async function ensureRecordsDir(): Promise<void> {
  try {
    await mkdir(RECORDS_DIR, { recursive: true })
  } catch (error) {
    console.error('Failed to create records directory:', error)
    throw error
  }
}

/**
 * Convert record to CSV row
 */
function recordToCsvRow(record: PredictionRecord): string {
  return [
    record.timestamp,
    record.filename,
    record.human_score.toFixed(6),
    record.nonhuman_score.toFixed(6),
    record.risk_level,
    record.actual_label || 'PENDING',
  ].join(',')
}

/**
 * Get CSV header
 */
function getCsvHeader(): string {
  return ['Timestamp', 'Filename', 'Human Score', 'Nonhuman Score', 'Risk Level', 'Actual Label'].join(',')
}

/**
 * Log prediction to CSV file
 */
export async function logPredictionToCSV(record: PredictionRecord): Promise<void> {
  try {
    await ensureRecordsDir()

    // Check if CSV file exists
    const csvExists = existsSync(CSV_FILE)

    // If file doesn't exist, create it with header
    if (!csvExists) {
      const header = getCsvHeader()
      const csvRow = recordToCsvRow(record)
      const content = `${header}\n${csvRow}\n`
      await writeFile(CSV_FILE, content)
      console.log(`Created records CSV: ${CSV_FILE}`)
    } else {
      // Append to existing CSV
      const csvRow = recordToCsvRow(record)
      const existingContent = await readFile(CSV_FILE, 'utf-8')
      const newContent = existingContent + csvRow + '\n'
      await writeFile(CSV_FILE, newContent)
    }

    console.log(`Logged prediction for: ${record.filename}`)
  } catch (error) {
    console.error('Failed to log prediction to CSV:', error)
    // Don't throw - logging failure shouldn't break the API
  }
}

/**
 * Get all predictions from CSV
 */
export async function getAllPredictions(): Promise<PredictionRecord[]> {
  try {
    if (!existsSync(CSV_FILE)) {
      return []
    }

    const content = await readFile(CSV_FILE, 'utf-8')
    const lines = content.trim().split('\n')

    // Skip header and parse lines
    const records: PredictionRecord[] = lines.slice(1).map((line) => {
      const [timestamp, filename, humanScore, nonhumanScore, riskLevel, actualLabel] = line.split(',')
      return {
        timestamp: timestamp || '',
        filename: filename || '',
        human_score: parseFloat(humanScore || '0'),
        nonhuman_score: parseFloat(nonhumanScore || '0'),
        risk_level: riskLevel || '',
        actual_label: actualLabel === 'PENDING' || !actualLabel ? undefined : actualLabel,
      }
    })

    return records
  } catch (error) {
    console.error('Failed to read predictions from CSV:', error)
    return []
  }
}

/**
 * Update actual label for a prediction
 */
export async function updateActualLabel(filename: string, actualLabel: string): Promise<boolean> {
  try {
    if (!existsSync(CSV_FILE)) {
      console.warn('CSV file does not exist')
      return false
    }

    const content = await readFile(CSV_FILE, 'utf-8')
    const lines = content.trim().split('\n')
    const header = lines[0]

    // Find and update the matching record
    const updatedLines = lines.map((line, index) => {
      if (index === 0) return line // Skip header

      const parts = line.split(',')
      if (parts[1] === filename) {
        // Update the actual_label (last column)
        parts[5] = actualLabel
        return parts.join(',')
      }
      return line
    })

    const newContent = updatedLines.join('\n') + '\n'
    await writeFile(CSV_FILE, newContent)
    console.log(`Updated label for ${filename}: ${actualLabel}`)
    return true
  } catch (error) {
    console.error('Failed to update label:', error)
    return false
  }
}
