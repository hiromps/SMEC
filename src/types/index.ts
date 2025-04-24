export interface Question {
  id: string;
  category: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

export type CategoryType = '財務・会計' | '運営管理' | 'マーケティング' | '経済学・経済政策' | '企業経営理論' | '総合テスト';

export interface QuizResult {
  correctCount: number;
  totalQuestions: number;
  category: CategoryType;
}