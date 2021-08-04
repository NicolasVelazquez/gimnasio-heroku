export default class MemberUtils {

    static async populateMember(member, data) {
        member.name = data.name;
        member.lastName = data.lastName
        member.email = data.email;
        member.genre = data.genre;
        member.phonenumber = data.phonenumber;
        member.birthday = data.birthday;
    }
}