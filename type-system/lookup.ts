interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const task: Task = {
    id: 666,
    title: 'Open a bug',
    completed: false
};

function lookup<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const id = lookup(task,'id');
console.log(id);
