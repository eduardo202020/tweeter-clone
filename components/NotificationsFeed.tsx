import { BsTwitter } from "react-icons/bs";

import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";
import type { Notification } from "@prisma/client";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  // cada vez que el componente se renderiza se reseteara su valor a false ya que ya se vio las notificaciones

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  const separar = (msg: string) => {
    const miArray = msg.split("-");

    return (
      <p>
        <span className="font-bold capitalize text-lg">{miArray[0]} </span>
        {miArray[1]}
      </p>
    );
  };

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Notification) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <BsTwitter color="white" size={32} />
          <h2 className="text-white">{separar(notification.body)}</h2>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
