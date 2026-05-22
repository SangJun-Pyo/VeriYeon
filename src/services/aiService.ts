export type AIReport = {
  compatibilityScore: number;
  keywords: string[];
  summary: string;
  positiveSignals: string[];
  cautionSignals: string[];
};

const reportPool: AIReport[] = [
  {
    compatibilityScore: 87,
    keywords: ['가치관 일치', '생활패턴 유사', '결혼관 공감'],
    summary: '두 분의 가치관과 결혼에 대한 시각이 높은 수준으로 일치합니다.',
    positiveSignals: [
      '결혼 희망 시기가 동일 구간에 속합니다.',
      'MBTI 보완형 조합으로 장기적 안정성이 높습니다.',
      '취미 영역 3개 이상이 겹칩니다.',
    ],
    cautionSignals: [
      '거주 지역권에 차이가 있습니다.',
    ],
  },
  {
    compatibilityScore: 79,
    keywords: ['지적 호기심', '독립성 균형', 'MBTI 보완'],
    summary: '서로 다른 강점이 보완적으로 작용할 가능성이 높습니다.',
    positiveSignals: [
      '두 분 모두 성장 지향적 가치관을 가지고 있습니다.',
      '대화 방식의 깊이가 유사합니다.',
    ],
    cautionSignals: [
      '주말 라이프스타일에 일부 차이가 있을 수 있습니다.',
      '경제관에 대한 추가 확인이 필요합니다.',
    ],
  },
];

export async function getMockAIReport(): Promise<AIReport> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return reportPool[Math.floor(Math.random() * reportPool.length)];
}
