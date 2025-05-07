const Member = require("../models/Member");


// sinh ra 40 thành viên trong team từ A1 - A40 đồng thời gán roles
function generateMember(size,numCore,numKey,numSub ) {

    let members = [];
    for (let i = 1; i <= size; i++) {
        if (i <= numCore) {
            const member = new Member("A" + i, "core");
            members.push(member);
        }
        if (i > numCore && i <= (numCore+numKey)) {
            const member = new Member("A" + i, "key");
            members.push(member);
        }
        if (i > (numCore+numKey) && i <= (numCore+numKey+numSub)) {
            const member = new Member("A" + i, "substitute");
            members.push(member);
        }
        if (i > (numCore+numKey+numSub)) {
            const member = new Member("A" + i, "nomal");
            members.push(member);
        }
    }
    return members;
}
// sinh ra các tôt hợp team ban đầu khi chưa có điều kiện lọc sẽ là 25 cách (1C1 * 5C1 * 5C1)
function generateTeam() {
    const members = generateMember(40,1,5,5);

    let teams = [];

    const core = members.filter(m => m.role === "core");
    const keys = members.filter(m => m.role === "key");
    const subs = members.filter(m => m.role === "substitute");

    // vì chỉ có 1 người core nên tổ hợp nào cũng sẽ có người đó
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < subs.length; j++) {
            teams.push([core[0], keys[i], subs[j]]);
        }
    }

    return teams;

}
// lấy các tổ hợp team sau khi đã lọc qua điều kiện cặp bày trùng và không hợp nhau
function getFilterTeams(requiredPairs, forbiddenPairs) {
    const teams = generateTeam();

    const validTeams = teams.filter(team => {
        let check = true;

        const teamNames = team.map(member => member.name);

        // nếu 1 team có 1 người của cặp bày trùng thì team đó bị loại 
        requiredPairs.forEach(pair => {
            const [a, b] = pair;
            const hasA = teamNames.includes(a);
            const hasB = teamNames.includes(b);
            if ((hasA && !hasB) || (!hasA && hasB)) {
                check = false;
            }
        });
        // nếu team đó có cả cặp không hợp nhau thì team đó bị loại
        forbiddenPairs.forEach(pair => {
            const [a, b] = pair;
            const hasA = teamNames.includes(a);
            const hasB = teamNames.includes(b);
            if (hasA && hasB) {
                check = false;
            }
        });

        return check;
    });

    return validTeams;
}

// ở đây hlv có thể chỉnh sửa danh sách cặp bày trùng và các cặp không hợp nhau để lọc ra các tổ hợp team thoả điều kiện
// Các cặp bắt buộc phải đi chung (theo tên)
const requiredPairs = [
    ["A2", "A3"],   
    ["A4", "A10"]   
];

// Các cặp không được đi cùng đội
const forbiddenPairs = [
    ["A5", "A20"],   
    ["A6", "A9"]    
];

// In danh sách tất cả team
console.log("All 25 teams:");
console.table(generateTeam().map(team => ({
    core: team[0].name,
    key: team[1].name,
    substitute: team[2].name
})));


// In các team hợp lệ sau khi lọc theo ràng buộc
console.log("\nValid teams after filtering:");
const filterTeams = getFilterTeams(requiredPairs, forbiddenPairs);
console.table(filterTeams.map(team => ({
    core: team[0].name,
    key: team[1].name,
    substitute: team[2].name
})));
console.log(`\n Total valid teams: ${filterTeams.length}`);
