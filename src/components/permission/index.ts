// import React from 'react';
// import { usePermission } from '../hooks/usePermission';

// interface PermissionProps {
//   permissions: string[] | undefined;
//   children: React.ReactNode;
//   fallback?: React.ReactNode;
// }

// export const Permission: React.FC<PermissionProps> = ({
//   permissions,
//   children,
//   fallback = null,
// }) => {
//   const hasPermission = usePermission(permissions);

//   if (hasPermission) {
//     return <>{children}</>;
//   }

//   return <>{fallback}</>;
// };