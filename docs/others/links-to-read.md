https://dev.to/rubemfsv/clean-architecture-applying-with-react-40h6
psicomanager -> referencia

--
Prisma -> performance baixa
https://codedamn.com/news/product/dont-use-prisma
https://www.youtube.com/watch?v=jqhHXe746Ns

-- Alternativas para avaliar para usar na possivel migração do psca --
https://orm.drizzle.team/
https://kysely.dev/

ps: a ideia é continuar com o prisma fazendo a migração e schemas, apenas as querys com as alternativas a cima

--
plainToInstance

--

we use the class-transformer function plainToInstance() to transform our plain JavaScript argument object into a typed object so that we can apply validation. The reason we must do this is that the incoming post body object, when deserialized from the network request, does not have any type information (this is the way the underlying platform, such as Express, works). Class-validator needs to use the validation decorators we defined for our DTO earlier, so we need to perform this transformation to treat the incoming body as an appropriately decorated object, not just a plain vanilla object.

--

type guard error handling: https://www.youtube.com/watch?v=xdQkEn3mx1k&t=114s

--

https://aykhanhuseyn.medium.com/typescript-naming-conventions-crafting-maintainable-code-7d872234fe17
