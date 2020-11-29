// 基本返回码
export const SUCCESS = 101
export const PARAM_WRONG = 102
export const NEED_TO_LOGIN = 103
export const REQUIRE_STUDENT = 104
export const REQUIRE_TEACHER = 105
export const REQUIRE_ADMIN = 106

// 用户操作返回码
export const LOGIN_FAILED = 201
export const ACCOUNT_RECUR = 202
export const CHANGE_PASSWORD_FAILED = 203

// 业务异常返回码
export const NOT_TEACHER_CREATE_PAPER = 301
export const NOT_PAPER_CREATOR = 302
export const FIND_FAILED = 303
export const PAPER_STATE_NOT_ANSWERING = 304
export const ANSWER_TWICE = 305
export const ANSWER_OTHERS_PAPER = 306
export const PAPER_NOT_EXIST = 307
export const PROBLEM_NOT_EXIST = 308
export const PAPER_ANSWER_NOT_EXIST = 309
export const PAPER_STATE_CHANGE_NOT_ALLOW = 310
export const PAPER_STATE_IS_NOT_CREATING = 311
export const PAPER_STATE_IS_NOT_END_ANSWER = 312
export const PAPER_STATE_CAN_NOT_DELETE = 313
export const NOT_CREATOR_EXPORT_PAPER = 314
export const EXPORT_PAPER_FAILED = 315

// 系统错误返回码
export const USER_NOT_EXIST = 401
export const OSS_CLIENT_INIT_FAILED = 402
export const OSS_UPLOAD_FILE_FAILED = 403