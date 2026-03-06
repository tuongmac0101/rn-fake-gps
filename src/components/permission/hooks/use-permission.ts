// // hooks/usePermission.ts
// import { useMemo } from 'react';
// import { useUserStore } from '~/stores/user.store';


// export const usePermission = (requiredPermissions: string[] | undefined): boolean => {

//   const { permissions } = useUserStore(); 

//   const checkPermission = useSelector((state: any) => state.app.checkPermission);

//   return useMemo(() => {
//     if (!checkPermission || !requiredPermissions) {
//       return true;
//     }

//     if (!userPermissions || !requiredPermissions) {
//       return false;
//     }

//     return requiredPermissions.some(permission =>
//       userPermissions.some((p: string) => p === permission)
//     );
//   }, [userPermissions, requiredPermissions, checkPermission]);
// };