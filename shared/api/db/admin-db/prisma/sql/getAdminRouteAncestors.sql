-- @param $1:adminRouteIds An array of admin route ids
with recursive admin_route_tree as (
  select id,"parentId", id as "idPath" from "AdminRoute" WHERE id = ANY($1)

  UNION ALL

  select a.id,a."parentId", a.id || '-' || at."idPath" as "idPath" from "AdminRoute" a JOIN admin_route_tree at ON a.id = at."parentId"
),
ancestors_with_children as (
  select ar."id",ar."parentId",ar."icon",ar."redirect",ar."hidden",ar."component",ar."type",ar."key",ar."status",ar."path",ar."order",ar."createdAt",ar."updatedAt", art."routeName", art."langKey" from "AdminRoute" ar left JOIN "AdminRouteTranslation" art ON ar.id = art."routeId" where "parentId" in (select "parentId" from admin_route_tree)
),
all_with_id_path as (
  select awc."id",awc."parentId",awc."icon",awc."redirect",awc."hidden",awc."component",awc."type",awc."key",awc."status",awc."path",awc."routeName",awc."langKey",awc."order",awc."createdAt",awc."updatedAt",art."idPath" from ancestors_with_children awc left join admin_route_tree art on awc.id = art.id
)
select * from all_with_id_path
