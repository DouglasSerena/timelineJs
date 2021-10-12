export interface IConfiguration {
  color?: {
    blockAnchor?: string;
    pointer?: string;
    anchor?: string;
    cursor?: string;
    block?: string;
    time?: string;
  };
  cursor?: {
    slowUpdateTime?: number;
  };
  shortcut?: {
    cursor?: {
      follow?: string;
      move?: string;
    };
    anchors?: {
      start?: {
        add?: string;
        remove?: string;
      };
      end?: {
        add?: string;
        remove?: string;
      };
      clear?: string;
    };
  };
  zoom?: { max?: number; min?: number };
}
