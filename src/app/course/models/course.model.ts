export interface Course {
    id: number;
    title: string;
    description?: string
    imageUrl?: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    releasedAt?: Date;
    lessonCount: number;
}