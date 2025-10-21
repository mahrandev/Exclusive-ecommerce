import { User, Mail, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfileForm = ({
  t,
  registerProfile,
  handleSubmitProfile,
  errorsProfile,
  resetProfile,
  onSubmitProfile,
  isLoadingProfile,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-red-500">
        <User size={24} />
        {t("editProfile")}
      </h2>
      <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="firstName" className="mb-2 flex items-center gap-2">
              <User size={16} />
              {t("firstName")}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              {...registerProfile("firstName")}
              className="h-12"
              aria-invalid={errorsProfile.firstName ? "true" : "false"}
            />
            {errorsProfile.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {errorsProfile.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName" className="mb-2 flex items-center gap-2">
              <User size={16} />
              {t("lastName")}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              {...registerProfile("lastName")}
              className="h-12"
              aria-invalid={errorsProfile.lastName ? "true" : "false"}
            />
            {errorsProfile.lastName && (
              <p className="mt-1 text-sm text-red-500">
                {errorsProfile.lastName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="mb-2 flex items-center gap-2">
              <Mail size={16} />
              {t("email")}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...registerProfile("email")}
              className="h-12"
              aria-invalid={errorsProfile.email ? "true" : "false"}
            />
            {errorsProfile.email && (
              <p className="mt-1 text-sm text-red-500">
                {errorsProfile.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="address" className="mb-2 flex items-center gap-2">
              <MapPin size={16} />
              {t("address")}
            </Label>
            <Input
              id="address"
              {...registerProfile("address")}
              placeholder="Your address"
              className="h-12"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="px-8 py-3"
            onClick={() => resetProfile()}
          >
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            className="bg-red-500 px-8 py-3 text-white hover:bg-red-600"
            disabled={isLoadingProfile}
          >
            {isLoadingProfile ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              t("saveChanges")
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
