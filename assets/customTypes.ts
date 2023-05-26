export type PrepStackParamList = {
  PrepHome: undefined;
  Route: {
    routeID: string;
    routeTitle: string;
  };
};

export type PrepInfoProps = {
  title: string,
  id: string,
  category: string,
  pages: PageInfo[],
};


interface PageInfo {
  header: string;
  media: {
    content: string;
    contentType: string;
  };
  bodyText: string;
  accessibilityText: string,
}

export type WayfindingStackParamList = {
  WayfindingHome: undefined;
  Route: {
    routeID: string,
    routeTitle: string,
  }
}

export type WFCarouselProps = {
  imageURLs: any[];
  text: string[];
  jumpToIndexFromModal: number;
};