-- @param $1:articleCategoryIds An array of article category ids
with recursive article_cate_tree as (
  select id,"parentId", CAST(id as text) as "idPath" from "ArticleCategory" WHERE id = ANY($1)

  UNION ALL

  select ac.id,ac."parentId",CONCAT(CAST(ac.id as text), '-', CAST(act."idPath" as text)) as "idPath" from "ArticleCategory" ac JOIN article_cate_tree act ON ac.id = act."parentId"
),
ancestors_with_children as (
  select ac."id",ac."parentId",ac."status",ac."order",ac."createdAt",ac."updatedAt", actr."name", actr."langKey" from "ArticleCategory" ac left JOIN "ArticleCategoryTranslation" actr ON ac.id = actr."articleCategoryId" where "parentId" in (select "parentId" from article_cate_tree)
),
all_with_id_path as (
  select awc."id",awc."parentId",awc."status",awc."name",awc."langKey",awc."order",awc."createdAt",awc."updatedAt",act."idPath" from ancestors_with_children awc left join article_cate_tree act on awc.id = act.id
)
select * from all_with_id_path
