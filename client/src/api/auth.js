import api from "./axios";

export const fetchDataforUnloggedUser = async () => {
  return api.get("/api/dashboard/public");
};

export const fetchDataforloggedUser = async (Email) => {
  return api.get("/api/dashboard/user", {
    params: { Email },
    withCredentials: true,
  });
};

export const FollowRequest = async (EmailTrainer, EmailUser) => {
  return api.post(
    "/api/subscribe",
    { EmailTrainer, EmailUser },
    { withCredentials: true }
  );
};

export const unFollowRequest = async (EmailTrainer, EmailUser) => {
  return api.post(
    "/api/unsubscribe",
    { EmailTrainer, EmailUser },
    { withCredentials: true }
  );
};

export const buyProduct = async (validationcode, Email, TrainerPlanId) => {
  return api.post(
    "/api/buy-plan",
    { validationcode, Email, TrainerPlanId },
    { withCredentials: true }
  );
};

export const uploadnewPlans = async () => {};

export const editExitingPlan = async () => {};

export const deletePlan = async () => {};

export const getAllPlans = async () => {};

export const loginApi = async (Email, Password) => {
  return api.post("/api/login", { Email, Password });
};

export const registerApi = async (Email, Password, ConfirmPassword, role) => {
  return api.post("/api/register", {
    Email,
    Password,
    ConfirmPassword,
    Role: role,
  });
};

export const GoogleSignUpApi = async (Email) => {
  return api.post("/api/google/login", { Email });
};

export const otpSendApi = async (Email) => {
  return api.post("/api/otp/send", { Email });
};

export const verifyOtpApi = async (Email, Otp) => {
  return api.post("/api/otp/verify", { Email, Otp });
};

export const passwordRecoveryApi = async (Email) => {
  return api.post("/api/password-recovery", { Email });
};

export const resetPasswordApi = async (Email, NewPassword) => {
  return api.post("/api/reset-password", { Email, NewPassword });
};
