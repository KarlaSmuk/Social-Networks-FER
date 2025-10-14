export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    picture?: string;
}

export interface AuthState {
    user: UserData | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (userData: UserData, token: string) => void;
    signOut: () => void;
}