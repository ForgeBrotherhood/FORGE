// mobile/src/navigation/types.ts
import type { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type BrotherhoodStackParamList = {
  BrotherhoodHome: undefined;
  GroupList: undefined;
  GroupChat: { groupId: string };
};

export type MainTabsParamList = {
  Brotherhood: NavigatorScreenParams<BrotherhoodStackParamList>;
  Smith: undefined;
  Journal: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
};
