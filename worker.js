export default {
    async fetch(request, env) {
        const allowHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,OPTIONS",
            "Access-Control-Allow-Headers": "Authorizatiopn,Content-Type"
        };

        if (request.method === "OPTIONS") {
            // 返回204状态码，以及支持的头部
            return new Response(null, { status: 204, headers: allowHeaders });
        }

        if (request.method !== "POST") {
            // ‌405状态码（Method Not Allowed）表示客户端使用的HTTP请求方法（如GET、POST等）不被服务器允许用于请求的资源
            return new Response("Method Not Allowed", { status: 405, headers: allowHeaders });
        }

        try {
            const url = env.API_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
            const headers = {
                Authorization: request.headers.get("Authorization"),
                "Content-Type": "application/json"
            };

            let body = await request.text();
            let parsedBody = JSON.parse(body);
            parsedBody.stream = true; // 启用流式传输

            const response = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(parseBody)
            });

            if (!response.ok) {
                return new Response(JSON.stringify({ error: "请求失败", status: response.status }), {
                    status: response.status,
                    headers: { ...allowHeaders, "Content-Type": "application/json" }
                });
            }

            return new Response(response.body, {
                status: 200,
                headers: {
                    ...allowHeaders,
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache",
                    Connection: "keep-alive"
                }
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: "服务器内部错误", details: error.toString() }), {
                status: 500,
                headers: { ...allowHeaders, "Content-Type": "application/json" }
            });
        }
    }
};
