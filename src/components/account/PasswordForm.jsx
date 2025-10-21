import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PasswordForm = ({
  t,
  registerPassword,
  handleSubmitPassword,
  errorsPassword,
  resetPassword,
  onSubmitPassword,
  isLoadingPassword,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Password Changes
      </h2>
      <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="currentPassword" className="mb-2">
              {t("currentPassword")}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                {...registerPassword("currentPassword")}
                className="h-12 pr-10"
                aria-invalid={errorsPassword.currentPassword ? "true" : "false"}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {errorsPassword.currentPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errorsPassword.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="newPassword" className="mb-2">
              {t("newPassword")}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                {...registerPassword("newPassword")}
                className="h-12 pr-10"
                aria-invalid={errorsPassword.newPassword ? "true" : "false"}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {errorsPassword.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errorsPassword.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmNewPassword" className="mb-2">
              {t("confirmPassword")}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmNewPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...registerPassword("confirmNewPassword")}
                className="h-12 pr-10"
                aria-invalid={
                  errorsPassword.confirmNewPassword ? "true" : "false"
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {errorsPassword.confirmNewPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errorsPassword.confirmNewPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="px-8 py-3"
            onClick={() => resetPassword()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-red-500 px-8 py-3 text-white hover:bg-red-600"
            disabled={isLoadingPassword}
          >
            {isLoadingPassword ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Changing...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
