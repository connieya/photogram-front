// 게시물 피드 이미지 목록
export type UserImageInfo = {
  postImageUrl: string;
  caption: string;
  imageId: number;
  likeCount: number;
};

// 사용자 검색 유저 정보
export type UserInfo = {
  id: number;
  nickname: string;
  profileImageUrl: string;
  username: string;
};

// 유저 프로필 화면 정보
export type UserProfileInfo = {
  nickname: string;
  profileImageUrl: string;
  followState: boolean;
  website: string;
  bio: string;
  imageCount: number;
};
