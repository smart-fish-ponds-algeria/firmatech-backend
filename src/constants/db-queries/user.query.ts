import { UsersQuery } from '../../types/queries/user.queries'

export function UsersQueryBuilder(
  query: UsersQuery,
  dateQuery: {
    startDate?: string | undefined
    endDate?: string | undefined
  }
) {
  let searchFilter = {}

  let roleFilter = {}

  let dateQueryF = {}
  if (dateQuery && Object.keys(dateQuery).length > 0 && dateQuery.startDate && dateQuery.endDate) {
    dateQueryF = {
      createdAt: {
        $gte: new Date(dateQuery.startDate),
        $lte: new Date(dateQuery.endDate),
      },
    }
  } else {
    if (dateQuery?.startDate)
      dateQueryF = {
        createdAt: {
          $gte: new Date(dateQuery.startDate),
        },
      }
    if (dateQuery?.endDate) {
      dateQueryF = {
        createdAt: {
          $lte: new Date(dateQuery.endDate),
        },
      }
    }
  }
  if (query.search) {
    searchFilter = query.search
      ? {
          $or: [
            { firstName: { $regex: `.*${query.search}.*`, $options: 'i' } },
            { lastName: { $regex: `.*${query.search}.*`, $options: 'i' } },
            {
              $expr: {
                $regexMatch: {
                  input: { $concat: ['$firstName', ' ', '$lastName'] },
                  regex: `.*${query.search}.*`,
                  options: 'i',
                },
              },
            },
            {
              email: {
                $regex: `.*${query.search}.*`,
                $options: 'i',
              },
            },
            // { _id: new mongoose.Types.ObjectId(query.search) },
          ],
        }
      : {}
  }
  if (query.roles && Array.isArray(query.roles) && query.roles.length > 0) {
    roleFilter = {
      stores: {
        $elemMatch: {
          $or: [
            { 'storeUsersRole.roleId.name': { $in: query.roles } },
            { 'storeUsersRole.storeRoleId.name': { $in: query.roles } },
          ],
        },
      },
    }
  }

  return { searchFilter, roleFilter, dateQueryF }
}
