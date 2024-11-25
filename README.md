# 💻 Convention

## 🤝 Branch Naming Convention

| 머릿말  | 설명                               |
| ------- | ---------------------------------- |
| main    | 서비스 브랜치                      |
| develop | 배포 전 작업 기준                  |
| feature | 기능 단위 구현                     |
| hotfix  | 서비스 중 긴급 수정 건에 대한 처리 |

`예시: ARV-이슈번호-feat/작업내용`

## 🤝 Commit Convention

| 머릿말   | 설명                                                |
| -------- | --------------------------------------------------- |
| feat     | 새로운 기능 추가                                    |
| fix      | 버그 수정                                           |
| design   | CSS 디자인 등 사용자 UI                             |
| style    | 코드 포맷 변경                                      |
| refactor | 프로덕션 코드 리팩토링업                            |
| docs     | 문서 수정                                           |
| chore    | 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우 |
| rename   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우  |
| remove   | 파일을 삭제하는 작업만 수행한 경우                  |
| deploy   | 배포 관련 변경 사항의 경우                          |

## 🤝 Naming Convention

### 기본 네이밍 컨벤션

1. 컴포넌트는 `PascalCase` 사용
2. 폴더명은 `camelCase` 사용
3. 파일 명(**컴포넌트 제외**)은 camelCase 사용
4. 변수 및 함수는 `camelCase` 사용
5. 파라미터는 `camelCase` 사용
6. 상수는 `BIG_SNAKE_CASE` 사용
   <br/>

### 타입(Type) 컨벤션

1. prop 타입 interface 선언 시 → `컴포넌트명+Props`

```tsx
// 예시
interface PostPageProps {
		title: string | undefined;
		setContentWithoutTag: (content: string) => void;
}

const PostPage = (props: PostPageProps) => {
		const {title,
		setContentWithoutTag
		...
}
```

### 스타일(style) 컨벤션

- 컴포넌트 네이밍 규칙 : `Container` → `Wrapper` → `Box`

<br/>
