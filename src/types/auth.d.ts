export type SignUpResponse = {
  id: string;
  username: string;
  role: 'Listener' | 'Creator';
  token: string;
  token_gen_date: Date;
  token_expr_date: Date;
}

export type SignInResponse = SignUpResponse;