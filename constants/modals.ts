type Variant = {
  icon: string;
  name: string;
  imgUrl: string;
};

type Modals = MODALS.share | MODALS.edit | MODALS.deleteFolder;

export enum MODALS {
  deleteLink = "deleteLink",
  deleteFolder = "deleteFolder",
  addFolder = "addFolder",
  addLink = "addLink",
  share = "share",
  edit = "edit",
}

export const VARIANTINFO: Record<Modals, Variant> = {
  share: { icon: "공유", name: "공유", imgUrl: "/images/ic_share.svg" },
  edit: { icon: "펜", name: "이름변경", imgUrl: "images/ic_pen.svg" },
  deleteFolder: {
    icon: "쓰레기통",
    name: "삭제",
    imgUrl: "/images/ic_trash.svg",
  },
};