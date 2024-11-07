export class UpdateScoreDto {
  userId: string;
  roundNo: number;
  scoreData: ScoreDataDto[];
}

export class ScoreDataDto {
  teamId: string;
  marks: number;
}
