export interface Anime {
  id: string;
  type: string;
  attributes: {
    description: string;
    titles: {
      en: string;
      en_jp: string;
      ja_jp: string;
    };
    posterImage: {
      small: string;
      large: string;
    };
    coverImage: {
      original: string;
    };
    startDate: string;
  };
}

export interface AnimeResponse {
  data: Anime[];
}
