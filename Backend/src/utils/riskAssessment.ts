export interface RiskAssessment {
  level: string
  trustability: number
  riskType?: 'scam' | 'suspicious' | 'safe'
}

export function assessRisk(nonhumanScore: number, humanScore: number): RiskAssessment {
  let level: string
  let riskType: 'scam' | 'suspicious' | 'safe'

  if (nonhumanScore >= 0.8) {
    level = 'High Risk (AI voice)'
    riskType = 'scam'
  } else if (nonhumanScore >= 0.4) {
    level = 'Medium Risk (Suspicious)'
    riskType = 'suspicious'
  } else {
    level = 'Low Risk (Human)'
    riskType = 'safe'
  }

  // Trustability is human score as a percentage
  const trustability = Math.round(humanScore * 100 * 100) / 100

  return {
    level,
    trustability,
    riskType,
  }
}
