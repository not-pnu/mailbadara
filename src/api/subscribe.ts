import { clientFetchy } from '@/lib/ClientFetchy';
import { IDepartmentName } from '@/types/department';

export async function getDepartmentNameList() {
    return clientFetchy.get<IDepartmentName>('/api/department/name');
}

export async function postSubscribe(email: string, department: string) {
    return clientFetchy.post<string>('/api/user/subscribe', {
        body: {
            email,
            department,
        },
    });
}
