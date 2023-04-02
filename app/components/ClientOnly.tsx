"use client";

import { ReactNode, useEffect, useState } from "react";

interface ClienOnlyProps {
  children: ReactNode;
}

const ClientOnly: React.FC<ClienOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
