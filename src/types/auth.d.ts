export interface SignUpInfo {
    username: string,
    password: string,
    role: string
}

export interface SignInInfo {
    username: string,
    password: string,
}

export type SignUpResponse = {
    id: string;
    username: string;
    role: string;
    token: string;
    token_gen_date: Date;
    token_expr_date: Date;
}

export type SignInResponse = SignUpResponse;