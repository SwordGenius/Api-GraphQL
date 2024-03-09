import jwt  from "jsonwebtoken";
import 'dotenv/config';
import { GraphQLError } from 'graphql';
export const getToken = async (token: string) => {
    try {
        const {result}: any = jwt.verify(token, process.env.SECRET!);
        return result;
    } catch (error) {
        throw new GraphQLError('token wrong', {
            extensions: {
                code: 'not found',
            },
        });
    }
}