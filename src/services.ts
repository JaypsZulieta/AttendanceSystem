import { GuardAuthenticationService } from "./main/Authentication/GuardAuthenticationService";
import { GuardAuthorizationService } from "./main/Authorization/GuardAuthorizationService";
import { GuardServiceImpl } from "./main/Guard/GuardServiceImpl";
import { BcryptPasswordEncoder } from "./main/PasswordEncoder/BcryptPasswordEncoder";
import { BcrptPasswordValidator } from "./main/PasswordValidator/BcryptPasswordValidator";
import { JwtService } from "./main/Token/JwtService";
import { prismaGuardRepository } from "./repositories";

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY as string;

const bcryptPasswordEncoder = new BcryptPasswordEncoder();
const bcryptPasswordValidator = new BcrptPasswordValidator();

const jwtService = new JwtService();

export const guardService = new GuardServiceImpl({
    guardRepository: prismaGuardRepository,
    passwordEncoder: bcryptPasswordEncoder
});

export const guardAuthenticationService = new GuardAuthenticationService({
    jwtSecretKey: jwtSecretKey,
    refreshTokenSecretKey: refreshTokenSecretKey,
    passwordValidator: bcryptPasswordValidator,
    guardService: guardService,
    tokenService: jwtService
});

export const guardAuthorizationService = new GuardAuthorizationService({
    jwtSecretKey: jwtSecretKey,
    tokenService: jwtService,
    guardService: guardService
});