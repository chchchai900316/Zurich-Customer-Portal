import { MemberItem, MemberItemParams } from "@/components/memberItem";

type GetMembersApiParams = {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: MemberItemParams[]
    support: {
        url: string,
        text: string
    }
}

async function callGetMembersApi(page: number = 1): Promise<GetMembersApiParams> {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
    const membersResponse: GetMembersApiParams = await response.json();
    return membersResponse;
}

async function getRemainingPages(page: number, total_pages: number, data: MemberItemParams[]): Promise<MemberItemParams[]> {
    const promises = [];
    for (let i = page + 1; i <= total_pages; i++) {
        promises.push(callGetMembersApi(i));
    }

    await Promise.all(promises).then((responses) => {
        responses.forEach((response) => {
            data.push(...response.data);
        });
    }).catch((error) => {
        throw new Error(error);
    });

    return data
}

function filterMembers(data: MemberItemParams[]): MemberItemParams[] {
    return data.filter((member) => {
        return /^G/.test(member.first_name) || /^W/.test(member.last_name);
    });
}

async function getMembers(): Promise<MemberItemParams[]> {
    const { page, total_pages, data } = await callGetMembersApi();
    await getRemainingPages(page, total_pages, data);

    const members = filterMembers(data)
    return members
}

async function maskEmail(email: string): Promise<string> {
    "use server"
    return email.replace(/./g, '*');
}

export default async function Members() {

    const members = await getMembers();
    return (
        <div className="container mx-auto p-4 mb-16">
            <ul className="container mx-auto">
                {members.map((member) => (
                    <MemberItem key={member.id} {...member} maskEmail={maskEmail} />
                ))}
            </ul>
        </div>
    );
}