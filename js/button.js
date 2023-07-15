window.addEventListener('DOMContentLoaded', (event) => {
    // 共有ボタンを表示する要素を全て取得
    const shareButtons = document.querySelectorAll('.mastoshare');

    // 各ボタンに対してループ処理
    shareButtons.forEach((button) => {
        // データ属性から情報を取得
        const text = encodeURIComponent(button.getAttribute('data-text'));
        const url = encodeURIComponent(button.getAttribute('data-url'));
        // データ属性からボタンのテキストを取得、もしくは既定のテキストを使用
        const buttonText = button.getAttribute('data-button-text') || 'Share on Mastodon';
        // 新しいa要素を作成
        const link = document.createElement('a');
        link.href = `http://localhost:3000/share?text=${text}&url=${url}`;
        link.textContent = buttonText;
        link.className = 'mastoshare-button';  // CSSクラスを追加

        // クリックイベントを設定
        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.open(link.href, '_blank', 'width=500,height=600');
        });

        // 元の要素の中身を空にし、新しいリンクを追加
        button.textContent = '';
        button.appendChild(link);
    });
});
