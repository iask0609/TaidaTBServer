function medalsapplication(UserId,ServiceId,Material) {
    /**
     * 这时查询志愿者曾经参与的志愿服务并将当前勋章申请的内容加在志愿服务的数据中
     */
    application.savemedalapplication({
        where: {
            UserId: UserId,
            ServiceId: ServiceId
        }
    }).then(function(result){

    })

}