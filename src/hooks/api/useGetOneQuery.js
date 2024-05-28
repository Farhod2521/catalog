import { useQuery } from "@tanstack/react-query";
import { request } from "@/services/api";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const useGetOneQuery = ({
  key = "get-one",
  url = "/",
  id,
  params = {},
  headers = {},
  showSuccessMsg = false,
  showErrorMsg = false,
  enabled = true,
}) => {
  const { t } = useTranslation();

  const { isLoading, isError, data, error, isFetching } = useQuery(
    [key, params],
    () =>
      request.get(`${url}${id}`, {
        params,
        headers,
      }),
    {
      onSuccess: () => {
        if (showSuccessMsg) {
          toast.success(t("SUCCESS"));
        }
      },

      onError: (data) => {
        if (showErrorMsg) {
          toast.error(t(`ERROR`));
        }
      },
      enabled,
    },
  );

  return {
    isLoading,
    isError,
    data,
    error,
    isFetching,
  };
};

export default useGetOneQuery;
