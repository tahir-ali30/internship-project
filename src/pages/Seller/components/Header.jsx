import React from 'react'
import { useSelector } from 'react-redux'

export default function Header() {
    const user = useSelector(state => state.user.userData);

    return (
        <header className='px-4 py-6'>
            <div className='flex justify-between'>
                <div></div>
                <div className='flex items-center gap-3'>
                    <div className='max-w-8'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6xJREFUeNrsmt1OGkEUxw9bjIZgEGKsjb2AC+7pEwD3NpUnUN+gPoH1CewbFJ5AknoPPoF4bUw3pIglVcESIzHSniMzZtnuLrtzhq+m/2SCAjPMb86ZmXNmNgQadH5+voIvOSwZLFksSVGcZIpygqWWTqfLOvoQYgJs4cs2li1mPwimxIEKKQLs4Mu+x6iriix1gEDFsYIgALnPoXChcaqGZQ+BqtpBEIIAPsJk9Rlh9rSAiIlcmYAVvKyTR6C2MghCZATECkxXbQFTCwwyQxC+YEIuELQanc4QhBUm5eRmhkuFoxmEANGnitMHhsvqlIHZVUb00d21xD5RgflQ3rrP2C3yBeZHh44WEWGHNpButwsPvd7Qe0uLixCNRnXC7MpwJmx5c5/bar/fh5vbW7i9uYEn/NtJrwwD4okEJOJxMAyD+5PU5+KLRUQUe8RpsYej/73RgMfHR1/fX1hYgLcbG7CIVmKqQFGzHJJtLkS9XvcNQaLvUp2ezf0U9OF5sotYSjmfkB1ycyUvUR2q21eoa9GWXLVynFZarZYShBXmB7bB2SRp2zA4mx9Z4xeuTlx1Op1AbumgZ5Cscgfu7rSto13egGRZFrm/v9cGwmwracxKcPjEm/BJA/4R/QeRu7MuLTF3eBbIssYAMBKJTA+EIlkdVqE2uFGxIfJgZb1eW2ODaGijRiA1rlVisZhyfaqrIUcxCeSE28qb9XUlGKpDdTXoLMy1iBWGfN0rqbImV6urqxDH5EqTqjKx+q2rRQrJKQikYk91aWVaFq6oITuUamNiFZepbhn4dxyD1YNSWRxpjaM9SmXr8lua4029ZD9F+Qb6L27GLRPdKmXfEA90/gLNFQrNrYWZPDnppc/2k0Zlq1BiJDv8MOJAgSY9xVY06RmnKFW0Rl7+E7Z9uAsBjkzlOVbQVFUCU11asglI4Zxr6Cbrr2sFv1dsP6+vfe0ZfhVwb6EL00+eIALm1C0FppFvNBoj3YcTBdPBnYd1hlxqVPSbdwom6TDNNM2xQUi3u7i4cDu4oyik4DuMFzdCQzDyNFGXK43K3x1OIakvBbdLUVf7ibu6ZxjOaSIHptlsylNIEwb3IaZSYiVgUs2rq+okIaTIhRuXlxSCvPO60XWd7E76enw8lQcG3m9u6nlgwAaTg8Fl0LhDmSotsQhR9VtB6aEaBNqBMT5UgwDFoBVZjzkhkI7HnNoiFC8FsYBWEAuQfPAsKzZSKm5HsTUx8mfkQpzOW/VHgAEAyGKqgmlEYZ8AAAAASUVORK5CYII=" alt="fallback profile img" /></div>
                    <h1>
                        {user?.first_name} {user?.last_name}
                    </h1>
                </div>
            </div>
        </header>
    )
}
