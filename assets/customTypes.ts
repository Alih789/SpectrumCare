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
    isVideo: boolean;
    content: string;
  };
  bodyText: string;
}
// export interface Procedure {
//   pages: PageInfo[];
// }
