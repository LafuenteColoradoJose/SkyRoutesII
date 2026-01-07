import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDbConnection = async () => {
    return {
        execute: async (query, params = []) => {
            // Simple check to distinguish query types
            const isSelect = query.trim().toUpperCase().startsWith('SELECT');

            try {
                if (isSelect) {
                    console.log('EXECUTING SELECT:', query, 'PARAMS:', params);
                    // mapParams handles if params is undefined
                    const result = await prisma.$queryRawUnsafe(query, ...params);
                    console.log('RESULT:', result);
                    // Mimic mysql2 return: [rows, fields]
                    return [result, []];
                } else {
                    const result = await prisma.$executeRawUnsafe(query, ...params);
                    // Mimic mysql2 OkPacket
                    // offset/insertId retrieval is tricky without explicit RETURNING or separate query
                    // providing a basic shim
                    return [{ affectedRows: result, insertId: 0, warningStatus: 0 }, []];
                }
            } catch (error) {
                console.error("Database Error (Prisma Adapter):", error);
                throw error;
            }
        },
        end: async () => {
            // No-op for Prisma
        }
    };
};
