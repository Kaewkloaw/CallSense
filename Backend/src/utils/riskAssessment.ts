export interface RiskAssessment {
  level: string
  trustability: number
}

export function assessRisk(nonhumanScore: number, humanScore: number): RiskAssessment {
  let level: string

  if (nonhumanScore >= 0.8) {
    level = 'High Risk (AI voice)'
  } else if (nonhumanScore >= 0.4) {
    level = 'Medium Risk (Suspicious)'
  } else {
    level = 'Low Risk (Human)'
  }

  // Trustability is human score as a percentage
  const trustability = Math.round(humanScore * 100 * 100) / 100

  return {
    level,
    trustability,
  }
}
