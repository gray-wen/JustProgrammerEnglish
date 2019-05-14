import { prefix, router, authorize } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import wordService from "../services/word.service";
import { CreateCollectModel } from "../model/word";
import { getUserId } from "../utils/jwtHelper";

@prefix("/word")
class WordController {
    @router({
        method: "get",
        path: "/getWord",
        unless: true
    })
    async getWord(ctx: CustomKoaContextModel) {
        // TODO 用户未授权返回默认
        let userId = 0, token = ctx.header["authorization"];
        if (token === "Bearer undefined") {
            ctx.body = await wordService.getDefaultWordAsync();
            return;
        };

        userId = await getUserId(token);
        ctx.body = await wordService.getWordAsync({ userId: userId, next: false });
    }

    @router({
        method: "get",
        path: "/getNextWord",
        unless: false
    })
    @authorize
    async getNextWord(ctx: CustomKoaContextModel) {
        ctx.body = await wordService.getWordAsync({ userId: ctx.user.id, next: true });
    }

    @router({
        method: "post",
        path: "/collectWord",
        unless: false
    })
    @authorize
    async collectWord(ctx: CustomKoaContextModel) {
        let params = <CreateCollectModel>ctx.request.body;
        params.userId = ctx.user.id;
        ctx.body = await wordService.collectWordAsync(params);
    }
}
