// * self 是指 Web Worker 的全局对象，类似于在浏览器中的 window 对象
// 发送请求的worker

// 当主线程 postMessage会触发onmessage的回调
self.onmessage = async event => {
    // 接收主线程发送过来的数据
    const { taskId, messages, userApiKey, model, API_URL } = event.data;
    // 构造请求数据
    const requestData = {
        model,
        messages,
        stream: true
    };

    try {
        // 发送请求
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        if (response.status === 401) {
            self.postMessage({ taskId, isComplete: true, resule: "认证失败，请检查API Key是否正确" });
            return;
        } else if (!response.ok) {
            self.postMessage({ taskId, isComplete: true, resule: `请求失败，错误码: ${response.status}` });
            return;
        }

        if (!response.body) {
            self.postMessage({ taskId, isComplete: true, result: "服务器未返回流数据" });
            return;
        }

        // 读取流式响应数据（sse）
        // 获取 ReadableStream 的读取器，用于读取流数据
        const reader = response.body.getReader();
        // 创建一个 TextDecoder 实例，用于将字节流转换为文本
        const decoder = new TextDecoder();
        // 用于累积从流中读取的文本内容
        let currentText = "";

        // 逐块读取流数据
        while (true) {
            // reader.read()：以流的形式读取数据，每次返回一个 done 和 value
            const { done, value } = await reader.read();
            // true 表示结束
            if (done) break;
            // decoder.decode(value)：将读取的字节流解码为文本
            const chunk = decoder.decode(value);
            // 将解码后的文本按行拆分并去掉空行
            const lines = chunk.split("\n").filter(line => line.trim() !== "");
            // 流式响应数据：
            // {"id":"****","choices":[{"delta":{"content":"我是","function_call":null,"refusal":null,"role":null,"tool_calls":null},
            // "finish_reason":null,"index":0,"logprobs":null}],"created":1735113344,
            // "model":"qwen-plus","object":"chat.completion.chunk","service_tier":null,
            // "system_fingerprint":null,"usage":null}
            for (const line of lines) {
                if (line.startsWith("data: ")) {
                    // 每行以 data: 开头，表示这行是有效的流数据
                    // 移除 `data: ` 前缀
                    const jsonLine = line.slice(6).trim();
                    if (jsonLine === "[DONE]") {
                        // 响应：data: [DONE] ，则结束
                        self.postMessage({ taskId, isComplete: true, result: currentText });
                        return;
                    }
                    try {
                        const parsedLine = JSON.parse(jsonLine);
                        const deltaContent = parsedLine?.choices?.[0]?.delta?.content;
                        if (deltaContent) {
                            currentText += deltaContent;
                            self.postMessage({ taskId, isComplete: false, result: currentText });
                        }
                    } catch (error) {
                        self.postMessage({ taskId, result: "解析流数据时出错，请稍后重试" });
                    }
                }
            }
        }
    } catch (error) {
        self.postMessage({ taskId, result: "请求失败，请稍后重试" });
    }
};
