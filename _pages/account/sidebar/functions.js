import { useSearchParams, useRouter } from "next/navigation";
import { icons } from "@/_lib/icons";

export const useActiveTab = () => {
  const params = useSearchParams();
  return params?.get("tab") || "dashboard";
};

export const useTabChange = () => {
  const router = useRouter();

  const handleTabChange = (tab) => {
    router.push(`?tab=${tab}`);
  };

  return handleTabChange;
};

export const handleClick = (tab, mutate, logout, handleTabChange) => {
  switch (tab) {
    // case "logout":
    //   logout(mutate);
    default:
      return handleTabChange(tab);
  }
};

export const handleButtonText = (isPending, tab, title) => {
  if (tab === "logout") {
    return isPending ? (
      <div className={`flex items-center justify-center`}>
        <span className={`animate-spin`}>{icons?.loading}</span>
      </div>
    ) : (
      title
    );
  }

  return title;
};

export const getName = (data) => {
  if (data?.first_name && data?.last_name) {
    return `${data?.first_name} ${data?.last_name}`;
  } else {
    return "";
  }
};
