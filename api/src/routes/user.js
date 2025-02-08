const express = require("express");
const { query, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/users", async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            posts: true,
        },
    });

    res.send(users);
});

router.get(
    "/users/search",
    query("q").notEmpty(),
    async (req, res) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            const { q } = req.query;

            const data = await prisma.user.findMany({
                where: {
                    name: {
                        contains: String(q),
                    },
                },
            });

            res.json(data);
        } else {
            res.status(400).json({ errors: result.array() });
        }
    }
);

module.exports = router;