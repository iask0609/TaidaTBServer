pragma solidity ^0.4.16;

contract Vote {
    // 投票人
    struct Voter {
        bool voted;    // 判断是否进行过投票
    }

    // 提案
    struct Proposal {
        uint id;        // 提议的ID
        uint voteCount; // 票数       
        //  暂定为五分制
        uint serviceContentScore; // 服务内容打分
        uint serviceTimeScore;    // 服务时间打分
        uint serviceAttitudeScore;// 服务态度打分
        uint elderlyEvaluation;   // 来自老人的评价
    }

    // 投票的发起者
    address public sponsor;

    // 投票人的地址结构数组
    mapping(address => Voter) public voters;

    // 一次提案
    Proposal public proposal;

    // 创建一次新的投票
    function Vote(uint id) public {
        sponsor = msg.sender;

        // 初始化这次投票
        proposal.id = id;
        proposal.voteCount = 0;
        proposal.serviceContentScore = 0;
        proposal.serviceTimeScore = 0;
        proposal.serviceAttitudeScore = 0;
        proposal.elderlyEvaluation = 0;
    }

    // 获取提议的标号
    function getProposalId() public view returns (uint theId) {
        theId = proposal.id;
    }

    // 获取提议的票数
    function getProposalCount() public view returns (uint theVoteCount) {
        theVoteCount = proposal.voteCount;
    }

    // 进行打分
    function scoring(uint score0, uint score1, uint score2, uint score3) public returns (uint err) {
        Voter storage theSender = voters[msg.sender];
        require(!theSender.voted);
        theSender.voted = true;
        
        proposal.serviceContentScore += score0;
        proposal.serviceTimeScore += score1;
        proposal.serviceAttitudeScore += score2;
        proposal.elderlyEvaluation += score3;

        proposal.voteCount = proposal.voteCount + 1;

        err = 1;
    }

    //  获取当前的提案结果
    function getResult() public view returns (uint[4] result) {
        result[0] = proposal.serviceContentScore / proposal.voteCount;
        result[1] = proposal.serviceTimeScore / proposal.voteCount;
        result[2] = proposal.serviceAttitudeScore / proposal.voteCount;
        result[3] = proposal.elderlyEvaluation / proposal.voteCount;
    }

    function getExample() public view returns (uint result) {
        result = proposal.serviceContentScore;
    }

}