export type Authentication<TEntity> = {
    user: TEntity,
    accessToken: string,
    refreshToken: string
}