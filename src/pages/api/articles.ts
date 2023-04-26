// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import articles from "@/data/articles.json"
import { IArticle } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"

interface ArticlesResponse {
  data: IArticle[] | IArticle
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ArticlesResponse>) {
  const { id } = req.query

  if (id) {
    const article = articles.find((article) => article.id === parseInt(id as string, 10))

    if (article) {
      res.status(200).json({ data: article })
    }

  } else {
    res.status(200).json({ data: articles })
  }
  res.status(404).end()
}
