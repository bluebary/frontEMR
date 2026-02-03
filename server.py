from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

# 현재 디렉토리의 절대 경로 가져오기
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.get("/")
async def read_index():
    return FileResponse(os.path.join(BASE_DIR, 'index.html'))

# 정적 파일 마운트 (CSS, JS 등)
app.mount("/", StaticFiles(directory=BASE_DIR), name="static")

if __name__ == "__main__":
    import uvicorn
    # mac 환경에서 로컬 접속 편의를 위해 0.0.0.0 바인딩
    uvicorn.run(app, host="0.0.0.0", port=8000)
