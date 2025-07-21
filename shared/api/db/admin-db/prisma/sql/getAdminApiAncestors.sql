-- @param $1:adminApiIds An array of admin api ids
with recursive admin_api_tree as (
  select id,"parentId", id as "idPath" from "AdminApi" WHERE id = ANY($1)

  UNION ALL

  select a.id,a."parentId", a.id || '-' || at."idPath" as "idPath" from "AdminApi" a JOIN admin_api_tree at ON a.id = at."parentId"
),
ancestors_with_children as (
  select aa."id",aa."parentId",aa."url",aa."method",aa."order",aa."createdAt",aa."updatedAt", aat."apiName", aat."langKey" from "AdminApi" aa left JOIN "AdminApiTranslation" aat ON aa.id = aat."apiId" where "parentId" in (select "parentId" from admin_api_tree)
),
all_with_id_path as (
  select awc."id",awc."parentId",awc."url",awc."method",awc."apiName",awc."langKey",awc."order",awc."createdAt",awc."updatedAt",aat."idPath" from ancestors_with_children awc left join admin_api_tree aat on awc.id = aat.id
)
select * from all_with_id_path
