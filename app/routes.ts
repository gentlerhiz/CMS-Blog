import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("./components/Layout.tsx", [
    index("routes/home.tsx"),
    route("articles", "routes/articles.tsx"),
    route("articles/new", "routes/articles.new.tsx"),
    route("articles/:id", "routes/articles.$id.tsx"),
    route("articles/:id/edit", "routes/articles.$id.edit.tsx"),
    route("editor", "routes/editor.tsx"),
  ]),
] satisfies RouteConfig;
