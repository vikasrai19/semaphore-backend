import { TeamScores } from '../entities/team-scores.entity';

export class EventHeadDashboardDto {
  constructor(cardList: CardDetailsDto[], topRankings: TeamScores[]) {
    this.cardList = cardList;
    this.topRankings = topRankings;
  }
  cardList: CardDetailsDto[];
  topRankings: TeamScores[];
}

export class CardDetailsDto {
  constructor(cardName: string, cardValue: number) {
    this.cardName = cardName;
    this.cardValue = cardValue;
  }
  cardName: string;
  cardValue: number;
}
