export const userSharedProjectPipe = {
  $project: {
    firstName: 1,
    lastName: 1,
    email: 1,
    _id: 1,
    imgUrl: 1,
  },
}
export const userSharedLookupPipe = [
  {
    $lookup: {
      from: 'users',
      localField: '_id',
      foreignField: '_id',
      as: 'responsibleData',
      pipeline: [userSharedProjectPipe],
    },
  },
  {
    $unwind: '$responsibleData',
  },
]

export const UserLookupByEmailPipeline = {
  $lookup: {
    from: 'users',
    localField: 'email',
    foreignField: 'email',
    as: 'user',
    pipeline: [userSharedProjectPipe],
  },
}

export const excludeUserDataProjectPipline = {
  $project: {
    smsVerifyExpiry: 0,
    passwordVerifyExpiry: 0,
    passwordResetToken: 0,
    otpSentDate: 0,
    passwordResetExpiry: 0,
    skipToken: 0,
    fcmTokens: 0,
    password: 0,
    smsVerifyToken: 0,
    passwordVerifyToken: 0,
  },
}

export const UsersStoreLookup = {
  $lookup: {
    from: 'stores',
    localField: '_id',
    foreignField: 'storeUsersRole.user',
    as: 'stores',
    pipeline: [
      { $unwind: '$storeUsersRole' },
      {
        $lookup: {
          from: 'storeroles',
          localField: 'storeUsersRole.storeRoleId',
          foreignField: '_id',
          as: 'storeUsersRole.storeRoleId',
        },
      },
      {
        $unwind: {
          path: '$storeUsersRole.storeRoleId',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'globalroles',
          localField: 'storeUsersRole.roleId',
          foreignField: '_id',
          as: 'storeUsersRole.roleId',
        },
      },
      {
        $unwind: {
          path: '$storeUsersRole.roleId',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          logo: 1,
          storeUsersRole: 1,
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          logo: { $first: '$logo' },
          storeUsersRole: { $push: '$storeUsersRole' },
        },
      },
    ],
  },
}

// export const UsersStoreLookup = {
//   $lookup: {
//     from: 'stores',
//     localField: '_id',
//     foreignField: 'storeUsersRole.user',
//     as: 'stores',
//     pipeline: [
//       {
//         $unwind: '$storeUsersRole',
//       },
//       {
//         $project: {
//           name: 1,
//           _id: 1,
//           storeUsersRole: 1,
//           logo: 1,
//         },
//       },
//       {
//         $group: {
//           _id: '$_id',
//           name: { $first: '$name' },
//           logo: { $first: '$logo' },
//           storeUsersRole: { $push: '$storeUsersRole' },
//         },
//       },
//     ],
//   },
// }
